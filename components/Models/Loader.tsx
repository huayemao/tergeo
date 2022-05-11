import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>已加载 {progress} % </Html>
}
