'use client'

import { useState } from 'react'

export interface UploadedFile {
  url: string
  name: string
}

interface FileUploadProps {
  label?: string
  onChange: (files: UploadedFile[]) => void
  accept?: string
}

export default function FileUpload({
  label = 'Upload Tech Pack / Design Files (optional)',
  onChange,
  accept = '.pdf,.ai,.psd,.eps,.jpg,.jpeg,.png,.zip,.doc,.docx',
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return
    setUploading(true)
    setError('')
    const uploaded: UploadedFile[] = []
    for (const file of Array.from(fileList)) {
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (res.ok && json.url) {
          uploaded.push({ url: json.url, name: json.name || file.name })
        } else {
          setError(json.error || `Failed to upload ${file.name}`)
        }
      } catch {
        setError(`Failed to upload ${file.name}`)
      }
    }
    const next = [...files, ...uploaded]
    setFiles(next)
    onChange(next)
    setUploading(false)
  }

  function removeFile(idx: number) {
    const next = files.filter((_, i) => i !== idx)
    setFiles(next)
    onChange(next)
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#777', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <label
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '14px', borderRadius: 10, border: '1.5px dashed rgba(0,0,0,0.18)',
          background: '#f8f8f8', color: '#666', fontSize: '0.85rem', cursor: uploading ? 'wait' : 'pointer',
        }}
      >
        <i className="fas fa-paperclip" />
        {uploading ? 'Uploading...' : 'Click to attach files (PDF, AI, PSD, JPG, PNG, ZIP, DOC)'}
        <input
          type="file"
          multiple
          accept={accept}
          style={{ display: 'none' }}
          disabled={uploading}
          onChange={e => { handleFiles(e.target.files); e.target.value = '' }}
        />
      </label>

      {error && <p style={{ color: '#ff4757', fontSize: '0.78rem', marginTop: 6 }}>{error}</p>}

      {files.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: '7px 12px',
            }}>
              <span style={{ fontSize: '0.8rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <i className="fas fa-check-circle" style={{ color: '#2a9d5c', marginRight: 6 }} />
                {f.name}
              </span>
              <button type="button" onClick={() => removeFile(i)}
                style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem', marginLeft: 8 }}>
                <i className="fas fa-times" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
