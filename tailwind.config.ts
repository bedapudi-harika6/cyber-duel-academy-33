import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyber: {
					background: '#000000',
					"background-alt": '#111111',
					"card-bg": 'rgba(17, 17, 17, 0.7)',
					neon: '#ea384c',
					purple: '#ea384c',
					red: '#ea384c',
					green: '#ea384c',
					"dark-purple": '#222222',
					"muted-text": '#888888',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"pulse-glow": {
					"0%, 100%": { 
						opacity: "1",
						filter: "drop-shadow(0 0 5px currentColor)" 
					},
					"50%": { 
						opacity: "0.7",
						filter: "drop-shadow(0 0 15px currentColor)" 
					}
				},
				"terminal-cursor": {
					"0%, 100%": { opacity: "0" },
					"50%": { opacity: "1" }
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				"glitch": {
					"0%, 100%": { transform: "translate(0)" },
					"20%": { transform: "translate(-2px, 2px)" },
					"40%": { transform: "translate(-2px, -2px)" },
					"60%": { transform: "translate(2px, 2px)" },
					"80%": { transform: "translate(2px, -2px)" }
				},
				"scan-line": {
					"0%": { transform: "translateY(0%)" },
					"100%": { transform: "translateY(100%)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out forwards",
				"fade-out": "fade-out 0.3s ease-out forwards",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
				"terminal-cursor": "terminal-cursor 1s ease-in-out infinite",
				"float": "float 3s ease-in-out infinite",
				"glitch": "glitch 0.3s ease forwards",
				"scan-line": "scan-line 4s linear infinite"
			},
			backgroundImage: {
				"cyber-grid": "linear-gradient(rgba(10, 25, 47, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 25, 47, 0.5) 1px, transparent 1px)",
				"glow-conic": "conic-gradient(from 180deg at 50% 50%, #00FFFF 0deg, #8B00FF 180deg, #00FFFF 360deg)",
			},
			boxShadow: {
				"neon-cyan": "0 0 5px theme('colors.cyber.neon'), 0 0 20px theme('colors.cyber.neon')",
				"neon-purple": "0 0 5px theme('colors.cyber.purple'), 0 0 20px theme('colors.cyber.purple')",
				"neon-red": "0 0 5px theme('colors.cyber.red'), 0 0 20px theme('colors.cyber.red')",
				"neon-green": "0 0 5px theme('colors.cyber.green'), 0 0 20px theme('colors.cyber.green')",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
