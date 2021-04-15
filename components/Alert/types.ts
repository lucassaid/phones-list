export interface ModalOptions {
  title?: string,
  desc?: any,
  content?: any,
  onAccept?: () => void,
  preventCloseOnBackdropClick?: boolean
}