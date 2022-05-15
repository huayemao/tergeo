import { BLUE, INDIGO, TEAL } from './colors';

export const TINT_MAPPING = {
  isHighlighted: (material: MeshdefaultMaterial, cases) => {
    material.color = INDIGO;
  },
  isAbsent: (material: MeshdefaultMaterial, cases) => {
    material.opacity = 0.35;
    material.transparent = true;
  },
  isHidden: (material: MeshdefaultMaterial, cases) => {
    material.opacity = 0;
    material.transparent = true;
  },
  isSelected: (material: MeshdefaultMaterial, cases) => {
    material.color = BLUE;
    if (cases.isAbsent) {
      material.color = TEAL;
    }
  },
};
