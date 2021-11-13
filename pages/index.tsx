import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/homePage/Hero'


const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Hero />
      </main>
    </div>
  )
}

export default Home
