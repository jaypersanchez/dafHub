import { Box, Loader } from 'rimble-ui'
import PageHead from '../components/PageHead'
import { agent } from '../daf/setup'

const Welcome = ({ issuer }) => {
  console.log('Issuer', issuer)

  return (
    <main>
      <PageHead title="Dafhub" description="Demo of daf + walletconnect" />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}
      >
        <Loader size="40px" />
      </Box>
    </main>
  )
}

export async function getServerSideProps(context) {
  const data = await agent.identityManager.getIdentities()

  //** Move this monkey check to the server set up after converting to TS so it will check before running the app */
  if (data.length === 0) {
    console.log('Creating issuer identity')
    await agent.identityManager.createIdentity('rinkeby-ethr-did')
  } else {
    console.log('Issuer identity already exists', data[0].did)
  }

  return {
    props: { issuer: 'OK' }, // will be passed to the page component as props
  }
}

export default Welcome
