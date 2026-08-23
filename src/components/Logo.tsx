export default function Logo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 450 130" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            .logo-text-blue {
              fill: #0c0887;
              font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
              font-weight: 800;
              font-size: 90px;
              letter-spacing: -3px;
            }
            .logo-text-orange {
              fill: #fc7451;
            }
          `}
        </style>
      </defs>
      
      <text x="10" y="90" className="logo-text-blue">
        webw<tspan className="logo-text-orange">o</tspan>rk
      </text>
      
      {/* smile under 'o' */}
      <path 
        d="M 270 98 A 20 20 0 0 0 310 98" 
        stroke="#fc7451" 
        strokeWidth="12" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
}
