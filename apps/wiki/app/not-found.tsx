import { Back } from '../component/Back'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="text-8xl text-center">404</h1>
      <Back>뒤로 가기</Back>
    </div>
  )
}
