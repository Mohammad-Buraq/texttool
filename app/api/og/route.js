// app/api/og/route.js
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const revalidate = 60 * 60 * 24 // 1 day

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'The Text Tool').slice(0, 90)
  const category = (searchParams.get('category') || '').slice(0, 40)
  const brand = 'thetexttool.com'

  // No local font to keep build simple on Vercel; uses system fallback
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(14,165,233,1), rgba(124,58,237,1))',
        }}
      >
        <div style={{ padding: 60 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {category ? (
            <div style={{ marginTop: 18, fontSize: 28, color: 'rgba(255,255,255,0.9)' }}>
              {category}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 60px 44px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: 28,
          }}
        >
          <div>Fast • Private • In-Browser</div>
          <div>{brand}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
