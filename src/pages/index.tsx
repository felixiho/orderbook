
import Layout from '@/layouts/Layout' 
import SelectorCard from '@/modules/token-selector/SelectorCard'
import { Flex } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'




const Home: NextPageWithLayout = () => {
    


  return (
    <Flex p={6} >
      <SelectorCard />
    </Flex>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>

  )
}

export default Home