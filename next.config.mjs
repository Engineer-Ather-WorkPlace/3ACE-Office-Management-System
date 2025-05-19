/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['economics.illinois.edu','via.placeholder.com','workdesign.com',
          'i.pinimg.com', 'lh7-rt.googleusercontent.com', 'pathwaycentres.oxfordinternational.com',
        'encrypted-tbn0.gstatic.com', 'encrypted-tbn0.gstatic.com', 'encrypted-tbn0.gstatic.com'
      ,'imageio.forbes.com', 'encrypted-tbn0.gstatic.com','www.sphinx-solution.com',
    'encrypted-tbn0.gstatic.com','www.magetop.com','static.vecteezy.com','motivitylabs.com',
  'www.creativeitinstitute.com','odysseydesignco.com','static.vecteezy.com'],
      },
};

export default nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'example.com',
//         port: '', // leave blank unless you're using a specific port
//         pathname: '/**', // allow all paths
//       },
//     ],
//   },
// };
