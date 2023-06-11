import { FC } from 'react'
import Container from './container'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='py-10'>
        <Container className='space-y-10'>
        <div className='flex flex-col items-center justify-center gap-y-5'>
            <h3 className='text-3xl font-semibold tracking-widest'>HMX</h3>
            <div className='flex gap-x-3'>
                <Github/>
                <Twitter/>
                <Linkedin/>
                <Mail/>
            </div>
        </div>
        <div>
            
        </div>
        </Container>
    </footer>
  )
}

export default Footer