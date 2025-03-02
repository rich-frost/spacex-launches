import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(-45deg,#388697,#23d5ab,#ee7752,#23a6d5)',
          fontSize: 80,
          fontWeight: 600,
          backgroundSize: '400% 400%',
          color: 'white',
        }}
      >
        <div
          style={{
            marginTop: 40,
            padding: '1rem 6rem',
            fontSize: 200,
            border: 'solid 0.5rem white',
            borderRadius: '50%',
          }}
        >
          B
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
