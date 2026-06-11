'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function AddressesPage() {
  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container-1200" style={{ maxWidth: 800 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Link href="/account" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
              <i className="fas fa-arrow-left" /> My Account
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', margin: 0 }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#ff4757', marginRight: '0.5rem' }} />
              My Addresses
            </h1>
            <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}
              onClick={() => alert('Address management will be connected in Week 5')}>
              <i className="fas fa-plus" /> Add Address
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,71,87,0.15)', color: '#ff4757', padding: '3px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700 }}>DEFAULT</span>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Shipping Address</h3>
            <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <div>Jane Smith</div>
              <div>My Brand Ltd</div>
              <div>123 Fashion Street, Suite 400</div>
              <div>Los Angeles, CA 90001</div>
              <div>United States</div>
              <div style={{ marginTop: '0.75rem', color: '#888' }}>
                <i className="fas fa-phone" style={{ marginRight: '0.5rem' }} />+1 555-0100
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                onClick={() => alert('Edit feature coming in Week 5')}>
                <i className="fas fa-edit" /> Edit
              </button>
              <button style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.85rem', cursor: 'pointer' }}>
                <i className="fas fa-trash" /> Delete
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Billing Address</h3>
            <div style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>
              <i className="fas fa-file-invoice" style={{ fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }} />
              <p>No billing address saved yet</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.8rem' }}
                onClick={() => alert('Will be connected in Week 5')}>
                Add Billing Address
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
