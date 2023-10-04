import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            resolves: [VantResolve()],
            libs: [
                {
                    libraryName: 'vant',
                    esModule: true,
                    resolveStyle: (name) => {
                        if (name == 'show-toast') {
                            return `../es/toast/style/index`; //修改vant show-toast引入路径
                        } else {
                            return `../es/${name}/style/index`; //修改vant引入路径
                        }
                    },
                }
            ]
        }),
    ],
    server: {
        host: 'localhost',
        port: 3000,
        // 是否开启 https
        https: false,
    },
})
