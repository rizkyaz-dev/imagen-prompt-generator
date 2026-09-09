import { useEffect, useState } from 'react'
import { Check, Clipboard, Clock3, Heart, ImagePlus, Info, Moon, Search, Sparkles, Sun, Trash2, WandSparkles, X } from 'lucide-react'
import { usePromptStore } from './store/promptStore'
import { formatPrompt } from './lib/promptFormatter'
import { artStyles, aspectRatios, cameraOptions, commonNegatives, lightingOptions, modelOptions, palettes, qualityTags } from './lib/modelPresets'
import { clearAllHistory, deleteFromHistory, getHistory, getTheme, saveTheme, saveToHistory, toggleFavorite } from './lib/storage'
import { generateVariations } from './lib/variations'
import { trackEvent } from './lib/analytics'
import type { PromptEntry, RawInputs } from './lib/types'
import './App.css'

type View = 'builder' | 'compose' | 'history' | 'favorites'

type ChipGroupProps = { label: string; options: string[]; selected: string[]; onChange: (value: string[]) => void; max?: number }

function ChipGroup({ label, options, selected, onChange, max }: ChipGroupProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) onChange(selected.filter((item) => item !== option))
    else if (!max || selected.length < max) onChange([...selected, option])
  }

  return (
    <fieldset className="field-group">
      <legend>{label}</legend>
      <div className="chips">
        {options.map((option) => (
          <button type="button" className={`chip ${selected.includes(option) ? 'selected' : ''}`} key={option} onClick={() => toggle(option)} aria-pressed={selected.includes(option)}>
            <span className="chip-dot" />{option}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function App() {
  const { inputs, update, updateCamera } = usePromptStore()
  const [preview, setPreview] = useState('')
  const [toast, setToast] = useState('')
  const [history, setHistory] = useState<PromptEntry[]>([])
  const [view, setView] = useState<View>('builder')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [search, setSearch] = useState('')
  const [variations, setVariations] = useState<string[]>([])
  const [variationCount, setVariationCount] = useState<2 | 3 | 5>(3)
  const [mobileOpen, setMobileOpen] = useState(true)
  const [referenceImage, setReferenceImage] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setPreview(formatPrompt(inputs)), 180)
    return () => window.clearTimeout(timer)
  }, [inputs])

  useEffect(() => () => { if (referenceImage) URL.revokeObjectURL(referenceImage) }, [referenceImage])

  useEffect(() => {
    void getHistory().then(setHistory)
    void getTheme().then(setTheme)
    trackEvent('page_view')
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2000)
  }

  const saveCurrent = async (isFavorite = false) => {
    if (!preview) return
    const entry: PromptEntry = {
      id: crypto.randomUUID(), createdAt: new Date().toISOString(), isFavorite,
      targetModel: inputs.targetModel, aspectRatio: inputs.aspectRatio, rawInputs: inputs, finalPromptText: preview,
    }
    await saveToHistory(entry)
    setHistory(await getHistory())
    showToast(isFavorite ? 'Disimpan ke favorit' : 'Prompt disimpan ke riwayat')
  }

  const copyPrompt = async (text = preview) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    trackEvent('copy_prompt')
    showToast('Prompt disalin!')
  }

  const createVariations = () => {
    setVariations(generateVariations(inputs, variationCount))
    trackEvent('generate_variations', { count: variationCount })
  }

  const saveVariation = async (text: string) => {
    const entry: PromptEntry = {
      id: crypto.randomUUID(), createdAt: new Date().toISOString(), isFavorite: true,
      targetModel: inputs.targetModel, aspectRatio: inputs.aspectRatio, rawInputs: inputs, finalPromptText: text,
    }
    await saveToHistory(entry)
    setHistory(await getHistory())
    showToast('Variasi disimpan ke favorit')
  }

  const model = modelOptions.find((item) => item.value === inputs.targetModel)
  const cameraLabels: Record<keyof RawInputs['camera'], string> = { angle: 'Sudut', shotType: 'Jenis bidikan', lens: 'Lensa', perspective: 'Perspektif' }
  const displayedHistory = (view === 'favorites' ? history.filter((item) => item.isFavorite) : history)
    .filter((item) => item.finalPromptText.toLowerCase().includes(search.toLowerCase()))

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    void saveTheme(next)
  }

  return (
    <div className={`app-shell ${theme}`}>
      <header className="topbar">
        <div className="brand"><strong>Imagen prompt canvas</strong></div>
        <nav className="nav-tabs" aria-label="Navigasi utama">
          <button className={view === 'builder' || view === 'compose' ? 'active' : ''} onClick={() => setView('builder')}>Beranda</button>
          <button className={view === 'history' ? 'active' : ''} onClick={() => setView('history')}><Clock3 size={15} />Riwayat <b>{history.length}</b></button>
          <button className={view === 'favorites' ? 'active' : ''} onClick={() => setView('favorites')}><Heart size={15} />Favorit</button>
        </nav>
        <button className="icon-button" aria-label="Ganti tema" onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
      </header>

      {(view === 'builder' || view === 'compose') && <main className={`workspace ${view}-view`}>
        <aside className="settings-panel panel">
          <button className="mobile-section-toggle" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            <span><span className="eyebrow">01 / ATUR</span><strong>Penyusun prompt</strong></span><WandSparkles size={22} className="heading-icon" />
          </button>
          <div className={`form-scroll ${mobileOpen ? 'open' : ''}`}>
            <section className="form-section subject-field"><label htmlFor="subject">Subjek utama <span className="required">wajib</span></label><textarea id="subject" maxLength={300} value={inputs.subject} onChange={(event) => update({ subject: event.target.value })} placeholder="contoh: rubah menjelajahi hutan bersalju" rows={4} /><div className="field-meta"><span>Jelaskan fokus visual utama</span><span>{inputs.subject.length}/300</span></div></section>
            <section className="reference-section field-group"><legend>Gambar referensi <span className="optional">opsional</span></legend><input id="reference-image" className="reference-input" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) setReferenceImage(URL.createObjectURL(file)) }} /><label className={`reference-dropzone ${referenceImage ? 'has-image' : ''}`} htmlFor="reference-image">{referenceImage ? <><img src={referenceImage} alt="Pratinjau gambar referensi" /><span className="reference-overlay">Ganti gambar</span><button type="button" className="reference-remove" aria-label="Hapus gambar referensi" onClick={(event) => { event.preventDefault(); setReferenceImage(null) }}><X size={14} /></button></> : <><ImagePlus size={22} /><strong>Tambahkan gambar</strong><span>JPG, PNG, atau WEBP</span></>}</label></section>
            <ChipGroup label="Gaya seni · pilih maksimal 2" options={artStyles} selected={inputs.styles} max={2} onChange={(styles) => update({ styles })} />
            <section className="form-section"><label htmlFor="custom-style">Gaya khusus <span className="optional">opsional</span></label><input id="custom-style" value={inputs.customStyle} onChange={(event) => update({ customStyle: event.target.value })} placeholder="Tambahkan karakter visual sendiri" /></section>
            <ChipGroup label="Pencahayaan & suasana" options={lightingOptions} selected={inputs.lighting} onChange={(lighting) => update({ lighting })} />
            <section className="field-group"><legend>Kamera & pembingkaian</legend><div className="select-grid">{(Object.keys(cameraOptions) as Array<keyof typeof cameraOptions>).map((key) => <label key={key}>{cameraLabels[key]}<select value={inputs.camera[key]} onChange={(event) => updateCamera(key, event.target.value)}><option value="">Pilih...</option>{cameraOptions[key].map((option) => <option key={option}>{option}</option>)}</select></label>)}</div></section>
            <section className="field-group"><legend>Warna & kualitas</legend><div className="palette-row">{palettes.map((palette) => <button type="button" key={palette} className={`palette ${inputs.palette === palette ? 'selected' : ''}`} onClick={() => update({ palette })}><span className={`swatch swatch-${palettes.indexOf(palette)}`} />{palette}</button>)}</div><div className="checks">{qualityTags.map((tag) => <label className="check" key={tag}><input type="checkbox" checked={inputs.qualityTags.includes(tag)} onChange={(event) => update({ qualityTags: event.target.checked ? [...inputs.qualityTags, tag] : inputs.qualityTags.filter((item) => item !== tag) })} /><span>{tag}</span></label>)}</div></section>
            <section className="form-section"><div className="label-row"><label htmlFor="negative">Prompt negatif <span className="optional">opsional</span></label><button type="button" className="text-button" onClick={() => update({ negativePrompt: commonNegatives })}>Masukkan umum</button></div><textarea id="negative" value={inputs.negativePrompt} onChange={(event) => update({ negativePrompt: event.target.value })} placeholder="blurry, watermark..." rows={3} /></section>
            <section className="field-group"><legend>Model tujuan</legend><select aria-label="Model tujuan" value={inputs.targetModel} onChange={(event) => update({ targetModel: event.target.value as RawInputs['targetModel'] })}>{modelOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><div className="model-note"><Info size={14} />Sintaks {model?.label} diperbarui otomatis</div></section>
          </div>
          <button type="button" className="generate-button" disabled={!inputs.subject.trim()} onClick={() => setView('compose')}><Sparkles size={17} />Hasilkan prompt</button>
        </aside>

        <section className="canvas-area">
          <div className="canvas-header"><div><span className="eyebrow">02 / SUSUN</span><h2>Ruang kerja langsung</h2></div><div className="status"><span />Tersimpan lokal</div></div>
          <div className="ratio-strip"><span>Rasio aspek</span>{aspectRatios.map((ratio) => <button key={ratio} type="button" className={`ratio-button ${inputs.aspectRatio === ratio ? 'selected' : ''}`} onClick={() => update({ aspectRatio: ratio })}><i className={`ratio-icon ratio-${ratio.replace(':', '-')}`} />{ratio}</button>)}</div>
          <div className="preview-panel panel"><div className="preview-top"><div><span className="eyebrow">03 / HASIL</span><h2>Pratinjau prompt</h2></div><span className="model-badge">{model?.label}</span></div><div className={`prompt-output ${!preview ? 'empty' : ''}`}>{preview || 'Prompt terstruktur akan muncul setelah Anda mengisi subjek utama.'}</div><div className="parameter-line"><span>{inputs.aspectRatio}</span><span>{inputs.styles.length + inputs.lighting.length} parameter kreatif</span><span><Info size={14} />{model?.label}</span></div><div className="action-row"><button className="primary-button" disabled={!preview} onClick={() => void copyPrompt()}><Clipboard size={17} />Salin prompt</button><button className="secondary-button" disabled={!preview} onClick={() => void saveCurrent(true)}><Heart size={17} />Simpan favorit</button><button className="secondary-button" disabled={!preview} onClick={createVariations}><Sparkles size={17} />Buat variasi</button>{view === 'compose' && <button type="button" className="secondary-button back-action" onClick={() => setView('builder')}>← Kembali ke beranda</button>}<button className="secondary-button history-save-button" disabled={!preview} onClick={() => void saveCurrent()}><Check size={17} />Simpan ke riwayat</button></div></div>
          {variations.length > 0 && <section className="variations-section"><div className="variations-header"><div><span className="eyebrow">EKSPLORASI PROMPT</span><h3>Variasi prompt</h3></div><div className="variation-counts">{([2, 3, 5] as const).map((count) => <button key={count} className={variationCount === count ? 'selected' : ''} onClick={() => { setVariationCount(count); setVariations(generateVariations(inputs, count)) }}>{count}</button>)}</div></div><div className="variation-grid">{variations.map((variation, index) => <article className="variation-card" key={`${variation}-${index}`}><span className="variation-number">0{index + 1}</span><p>{variation}</p><div><button className="text-button" onClick={() => void copyPrompt(variation)}><Clipboard size={13} />Salin</button><button className="text-button" onClick={() => void saveVariation(variation)}><Heart size={13} />Simpan</button></div></article>)}</div></section>}
        </section>
      </main>}

      {(view === 'history' || view === 'favorites') && <main className="library"><div className="canvas-header"><div><span className="eyebrow">04 / KOLEKSI</span><h2>{view === 'favorites' ? 'Prompt favorit' : 'Riwayat prompt'}</h2></div><button className="secondary-button" disabled={!history.length} onClick={() => { if (window.confirm('Hapus seluruh riwayat prompt?')) void clearAllHistory().then(() => setHistory([])) }}><Trash2 size={16} />Hapus semua</button></div><label className="search-box"><Search size={16} /><span className="sr-only">Cari prompt</span><input aria-label="Cari prompt" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari prompt tersimpan" /></label>{displayedHistory.length ? <div className="history-grid">{displayedHistory.map((entry) => <article className="history-card panel" key={entry.id}><div className="history-card-top"><span>{new Date(entry.createdAt).toLocaleDateString('id-ID')}</span><button className="icon-button" aria-label="Ubah status favorit" onClick={() => void toggleFavorite(entry.id).then(() => getHistory().then(setHistory))}><Heart size={16} fill={entry.isFavorite ? 'currentColor' : 'none'} /></button></div><p>{entry.finalPromptText}</p><div className="history-actions"><button className="text-button" onClick={() => void copyPrompt(entry.finalPromptText)}>Salin</button><button className="text-button" onClick={() => { update(entry.rawInputs); setView('builder') }}>Muat</button><button className="text-button danger" onClick={() => void deleteFromHistory(entry.id).then(() => getHistory().then(setHistory))}>Hapus</button></div></article>)}</div> : <div className="empty-library panel"><Clock3 size={28} /><h3>Belum ada prompt di sini</h3><p>Simpan prompt dari ruang kerja untuk membangun koleksi pribadi Anda.</p></div>}</main>}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </div>
  )
}

export default App
