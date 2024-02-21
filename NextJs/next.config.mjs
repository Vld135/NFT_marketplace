/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
      const origin = {...config.externals}
        config.externals.push({
          knex:'commonjs knex'
        });

        return config
      },
};

export default nextConfig;
