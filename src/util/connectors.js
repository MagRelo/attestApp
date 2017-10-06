import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('Individuality Attester', {
    clientId: '2oghfQT26sXXsgTKPhFccWq3inDVWwH4TUX',
    network: 'rinkeby',
    signer: SimpleSigner('c0fee934f5213c571e0014c25a7efab062edda51951e3cc2047495046b91c1ca')
})

export const web3 = uport.getWeb3()
