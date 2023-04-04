export class Log {
  constructor(content) {
    content = content.replace(" ", "");
    this.strs = content.split(":");
    this.id = parseInt(this.strs[0]);
    this.isStart = this.strs[1] == "start";
    this.time = parseInt(this.strs[2]);
  }
}