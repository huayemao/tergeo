import { useModel } from '../../contexts/modelContext'
import { useTooth } from '../../contexts/teethContext'

export function useSelectedTooth() {
  const { activeToothName } = useModel()
  return useTooth(activeToothName)
}
