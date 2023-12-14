import Image from 'next/image'
import { Inter } from 'next/font/google'
import {ModeToggle} from "@/components/mode-toggle";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <main>
        <div>
          <h1 className={"text-3xl"}>About me</h1>
          <p>My name is Joshua Hegedus and I am web developer</p>
            <ModeToggle />
        </div>
      </main>
  )
}
