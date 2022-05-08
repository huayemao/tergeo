// @ts-nocheck
import { useEffect } from 'react'
import { useModel, useModelDispatch } from '../contexts/modelContext'
import { useGLTF } from '@react-three/drei'
export function useFetchModel() {
  const dispatch = useModelDispatch()
  const { model } = useModel()


}
