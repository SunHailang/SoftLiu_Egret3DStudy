/// 阅读 declaration/api.d.ts 查看文档
///<reference path="declaration/api.d.ts"/>
import * as path from "path";
import { CleanPlugin, CompilePlugin, EmitResConfigFilePlugin, ExmlPlugin, ManifestPlugin, UglifyPlugin, ResSplitPlugin } from 'built-in';
import * as defaultConfig from './config';
import { bakeInfo, nameSelector, InspectorFilterPlugin, OnelineJson } from "./myplugin";
import { WxgamePlugin } from './wxgame/wxgame';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {
        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        const remoteDir = `../${projectName}_wxgame_remote_4`;

        if (command === 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new InspectorFilterPlugin(),
                    new WxgamePlugin(),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            };
        }
        else if (command === 'publish') {
            // TODO 合并操作应该在 publish 而不是 bake
            return {
                outputDir,
                commands: [
                    new ResSplitPlugin({
                        matchers:[
                            {from:"resource/2d/**/*.sheet",to:remoteDir},
                            {from:"!resource/2d/**",to:remoteDir},
                            // {from:"resource/Assets/**/*.scene.json",to:outputDir},
                            // {from:"resource/2d/**",to:outputDir},
                            // {from:"resource/Assets/**/*.+(scene|image).json",to:`../${projectName}_wxgame`},
                            // {from:"resource/**",to:`../${projectName}_wxgame_remote_1`},
                        ]
                    }),
                    new OnelineJson(),
                    new EmitResConfigFilePlugin({
                        output: bakeInfo.root + "default.res.json",
                        typeSelector: config.typeSelector,
                        nameSelector,
                        groupSelector: p => null
                    }),

                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new InspectorFilterPlugin(),
                    new WxgamePlugin(),
                    new UglifyPlugin([
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            };
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    typeSelector: defaultConfig.typeSelector
};

export = config;
