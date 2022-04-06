
// @ts-nocheck
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useEffect } from 'react';
import { useModelDispatch } from '../contexts/modelContext';
export function useFetchModel() {
  const dispatch = useModelDispatch();
  const gltf = useLoader(
    GLTFLoader,
    'http://192.168.3.65:3000/scene.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('http://192.168.3.65:3000/draco/');
      loader.setDRACOLoader(dracoLoader);
    }
  );

  useEffect(() => {
    dispatch({
      type: 'SET_MODEL',
      payload: {
        model: gltf,
      },
    });
  }, [gltf]);
}
