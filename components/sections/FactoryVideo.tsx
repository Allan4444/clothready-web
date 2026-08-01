import Reveal from '@/components/ui/Reveal'

// Set this to a hosted factory walkthrough video URL (e.g. uploaded via
// the admin Products image-upload flow, using bucket 'product-images' or
// a dedicated 'videos' bucket) to activate the player.
const VIDEO_SRC = ''

export default function FactoryVideo() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-10">
            <div className="section-label"><i className="fas fa-video" /> See It Yourself</div>
            <h2 className="section-title">Inside Our Factory</h2>
            <p className="section-subtitle mx-auto">
              A real, unedited look at our production floor — from cutting to final packing
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', background: '#111', position: 'relative' }}>
            {VIDEO_SRC ? (
              <video controls playsInline poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888', gap: '0.75rem' }}>
                <i className="fas fa-video-slash" style={{ fontSize: '2rem' }} />
                <p style={{ fontSize: '0.9rem' }}>Factory walkthrough video coming soon</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
