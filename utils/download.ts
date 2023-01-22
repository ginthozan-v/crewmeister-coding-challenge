export function download(filename: string, content: string): void {
  let alink = document.createElement('a');
  alink.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  );
  alink.download = `${filename}`;
  alink.click();
}
