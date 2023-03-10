import { ReactNode } from "react";

// 移除时的状态 完成 | 打断 | 重渲染 | 已经移除
type DetachStatus = "finished" | "break" | "render" | "none"
/**
 * DynamRender的处理器
 */
export class DynamRenderHanlder {
    private frontNode: ReactNode;
    private detachDelayTask: {
        timer: NodeJS.Timeout;
        callback: (v?: DetachStatus) => void;
    };

    constructor(
        private refresh: () => Promise<void>
    ) { }

    setRfn(rfn: () => Promise<void>) {
        this.refresh = rfn;
    }

    getFrontNode() {
        return this.frontNode;
    }

    renderOnFront(node: ReactNode): Promise<void> {
        if (this.detachDelayTask) {
            clearTimeout(this.detachDelayTask.timer);
            this.detachDelayTask.callback("render");
            this.detachDelayTask = null;
        }
        this.frontNode = node;
        return this.refresh();
    }

    detachOnFront(delay?: number): Promise<DetachStatus> {
        if (!this.frontNode) return Promise.resolve("none");
        if (delay) {
            return new Promise(resolve => {
                let timer = setTimeout(() => {
                    let task = this.detachDelayTask;
                    this.detachDelayTask = null;
                    this.frontNode = null;
                    this.refresh().then(() => task.callback("finished"));
                }, delay);
                this.detachDelayTask = {
                    timer,
                    callback: resolve
                }
            })
        }
        this.frontNode = null;
        return this.refresh().then(() => "finished");
    }

    destroy() {
        if (this.detachDelayTask) {
            clearTimeout(this.detachDelayTask.timer);
            this.detachDelayTask.callback("break");
            this.detachDelayTask = null;
        }
        this.frontNode = null;
        this.refresh = null;
    }
}