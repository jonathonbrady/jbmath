export interface AnimationMeta {
  name: string;
  initial: {};
  animation: {};
}

export interface AnimationObject {
  meta: AnimationMeta;
  target: number;
  when: number;
  length: number;
}
