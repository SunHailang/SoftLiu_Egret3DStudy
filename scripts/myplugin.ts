import * as path from 'path';

export class BakeInfo {
    currentRoot = "";
    readonly defaultRoot = "resource/";

    get root() {
        return this.currentRoot || this.defaultRoot;
    }
}

export const bakeInfo = new BakeInfo();

export const nameSelector = (p: string) => {
    if (p.indexOf("2d/") > 0) {
        return path.basename(p).replace(/\./gi, "_");
    }

    return p.replace(bakeInfo.root, "");
};

export class ModifyDefaultResJSONPlugin implements plugins.Command {
    constructor(public root?: string) {
    }

    async onFile(file: plugins.File) {
        if (this.root && file.origin.indexOf("default.res.json") >= 0) {
            const jsonContent: { resources: { url: string, name: string }[] } = JSON.parse(file.contents.toString());
            for (const data of jsonContent.resources) {
                if (data.url.indexOf(this.root) === 0) {
                    data.url = data.url.replace(this.root, "");
                }
                if (data.name.indexOf(this.root) === 0) {
                    data.name = data.name.replace(this.root, "");
                }
            }
            file.contents = new Buffer(JSON.stringify(jsonContent, null, 4));
        }

        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
    }
}

export class InspectorFilterPlugin implements plugins.Command {
    constructor(public enabled: boolean = true) {
    }

    async onFile(file: plugins.File) {
        if (this.enabled && file.origin.indexOf("inspector.js") >= 0 || file.origin.indexOf("inspector.min.js") >= 0) {
            return null;
        }

        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
    }
}

export class MergeJsonPlugin implements plugins.Command {

    private _jsonFileCollection:plugins.File[] = [];
    private _jsonRemoteFileCollection:plugins.File[] = [];

    constructor() {

    }

    async onFile(file: plugins.File) {

        if(file.extname === '.json' ) {

            if(file.origin.indexOf('default.res.json') < 0 && file.origin.indexOf('2d/') < 0)
            {
                this._jsonFileCollection.push(file);
                return null;

            } else {
                return file;
            }
        }

        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

        let mergeResult = {};
        
        for(let file of this._jsonFileCollection) {
            mergeResult[file.origin.replace('resource/','')] =  JSON.stringify(JSON.parse(file.contents.toString()));
        }
        
        commandContext.createFile(
                'resource/all.mergeJson',new Buffer(JSON.stringify(mergeResult)),
                {type:'mergeJson',subkeys:this._jsonFileCollection.map(file=>file.origin)}
            );

    }

}

export class CheckFileExistPlugin implements plugins.Command {
    
    async onFile(file:plugins.File) {

        if(file.origin.indexOf('mergeJson') > 0) {
            console.log('hjl.debug => mergeJson ',file.origin);
        }

        return file;
    }

    async onFinish(commandContext:plugins.CommandContext) {

    }

}

export class OnelineJson implements plugins.Command {

    async onFile(file:plugins.File) {

        if(file.extname === '.json') {

            file.contents = new Buffer(JSON.stringify(JSON.parse(file.contents.toString())));
                        
        }

        return file;

    }

    async onFinish(commandContext:plugins.CommandContext) {

    }

}