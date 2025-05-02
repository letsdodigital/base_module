import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add the modules directory to the Webpack resolver
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      modules: path.resolve(__dirname, '../modules')
    };

    // Include the modules directory in the Webpack loader for TypeScript
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, '../modules')],
      use: [
        {
          loader: 'next-swc-loader'
        }
      ]
    });

    return config;
  }
};

export default nextConfig;
