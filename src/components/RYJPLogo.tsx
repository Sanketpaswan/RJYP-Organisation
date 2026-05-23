import React from "react";

interface RYJPLogoProps {
  className?: string; // Tailwind or extra classes
  size?: number | string; // Width/Height
}

export default function RYJPLogo({ className = "", size = "100%" }: RYJPLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* Clip path to keep bottom silhouettes perfectly confined within the circle */}
      <defs>
        <clipPath id="logo-circle-clip">
          <circle cx="200" cy="200" r="150" />
        </clipPath>
      </defs>

      {/* Saffron Arc (Top) */}
      <path
        d="M 50,200 A 150,150 0 1,1 350,200"
        stroke="#ea580c"
        strokeWidth="11"
        strokeLinecap="round"
        className="stroke-orange-600"
      />

      {/* Blue Arc (Bottom) */}
      <path
        d="M 350,200 A 150,150 0 0,1 50,200"
        stroke="#0A2E6D"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Group inside the clip-path for bottom silhouettes */}
      <g clipPath="url(#logo-circle-clip)">
        {/* Stylized celebrating crowd/citizens silhouettes in solid navy blue */}
        <g fill="#0A2E6D">
          {/* Central Tall Figure */}
          <circle cx="200" cy="290" r="9" />
          <path d="M 200,298 C 185,282 170,270 160,265 C 158,268 160,272 172,279 L 192,293 L 200,297 L 208,293 L 228,279 C 240,272 242,268 240,265 C 230,270 215,282 200,298 Z" />
          <path d="M 193,298 H 207 L 213,355 L 187,355 Z" />

          {/* Left-1 Figure */}
          <circle cx="160" cy="308" r="8" />
          <path d="M 160,315 C 148,298 135,288 128,284 C 126,287 128,291 138,297 L 152,308 L 160,312 Q 166,307 172,302 L 175,306 Z" />
          <path d="M 154,315 H 166 L 171,355 L 149,355 Z" />

          {/* Right-1 Figure */}
          <circle cx="240" cy="308" r="8" />
          <path d="M 240,315 C 252,298 265,288 272,284 C 274,287 272,291 262,297 L 248,308 L 240,312 Q 234,307 228,302 L 225,306 Z" />
          <path d="M 234,315 H 246 L 251,355 L 229,355 Z" />

          {/* Left-2 Figure */}
          <circle cx="125" cy="324" r="7" />
          <path d="M 125,330 C 115,314 102,306 96,302 C 94,305 96,309 104,315 Q 116,324 125,327 Z" />
          <path d="M 119,330 H 131 L 135,355 L 115,355 Z" />

          {/* Right-2 Figure */}
          <circle cx="275" cy="324" r="7" />
          <path d="M 275,330 C 285,314 298,306 304,302 C 306,305 304,309 296,315 Q 284,324 275,327 Z" />
          <path d="M 269,330 H 281 L 285,355 L 265,355 Z" />
        </g>
      </g>

      {/* Central Brand Letters "R" and "JP" with elegant italicized typography */}
      <text
        x="77"
        y="235"
        fill="#0A2E6D"
        fontSize="100"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="system-ui, -apple-system, sans-serif, Arial"
        letterSpacing="-3"
      >
        R
      </text>

      <text
        x="235"
        y="235"
        fill="#0A2E6D"
        fontSize="100"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="system-ui, -apple-system, sans-serif, Arial"
        letterSpacing="-3"
      >
        JP
      </text>

      {/* Saffron "Y" stylized human figure in the center */}
      {/* Head */}
      <circle cx="178" cy="155" r="16" fill="#ea580c" className="fill-orange-600" />
      {/* Stylized Body and Outstretched Arms */}
      <path
        d="M 178,235 C 168,235 158,212 153,192 C 141,178 128,170 120,165 C 117,163 120,157 125,160 C 150,174 165,192 178,208 C 191,192 201,174 226,160 C 231,157 234,163 231,165 C 223,170 210,178 198,192 C 193,212 188,235 178,235 Z"
        fill="#ea580c"
        className="fill-orange-600"
      />

      {/* Indian National Tricolour flag waving from the "Y"'s right arm */}
      {/* Saffron stripe (top half) */}
      <path
        d="M 216,166 Q 248,122 298,131 T 368,111 L 362,124 Q 312,141 262,134 Z"
        fill="#ea580c"
        className="fill-orange-600"
      />
      {/* White stripe (middle half) */}
      <path
        d="M 224,173 Q 254,131 301,139 T 365,123 L 359,136 Q 309,150 269,143 Z"
        fill="#FFFFFF"
      />
      {/* Green stripe (bottom half) */}
      <path
        d="M 231,180 Q 260,140 304,147 T 362,135 L 356,148 Q 306,159 275,152 Z"
        fill="#138808"
      />

      {/* Double Separator Lines beneath the Brand name */}
      <line x1="65" y1="254" x2="115" y2="254" stroke="#0A2E6D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="285" y1="254" x2="335" y2="254" stroke="#0A2E6D" strokeWidth="2.5" strokeLinecap="round" />

      {/* Devanagari Hindi Text: "युवा शक्ति, राष्ट्र शक्ति" strictly styled */}
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fill="#0A2E6D"
        fontSize="17.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif, Poppins, Arial"
      >
        युवा शक्ति, राष्ट्र शक्ति
      </text>
    </svg>
  );
}
