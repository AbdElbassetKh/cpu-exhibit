declare module 'three/examples/jsm/loaders/FBXLoader' {
    import { Loader, LoadingManager, Group } from 'three';
  
    export class FBXLoader extends Loader {
      constructor(manager?: LoadingManager);
      load(
        url: string,
        onLoad: (object: Group) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
      parse(FBXBuffer: ArrayBuffer | string, path: string): Group;
    }
  }