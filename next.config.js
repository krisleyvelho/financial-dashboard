/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Otimizações de produção
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'ol'],
    globalNotFound: true,
  },

  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.next',
        '**/C:/DumpStack.log.tmp',
        '**/C:/hiberfil.sys',
        '**/C:/pagefile.sys',
        '**/C:/swapfile.sys',
        '**/C:/System Volume Information',
      ],
    }
    return config
  },
}

module.exports = nextConfig
