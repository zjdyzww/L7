// @ts-ignore
import React, { useState, useEffect, useRef, useReducer } from 'react';
import DemoList from './demos';
import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import GUI from 'lil-gui';
import { MapView } from './view/map'

export default () => {
    const searchParams = new URL(location as any).searchParams;
    const initState = searchParams.size === 0 ? ['Point', 'PointFill'] : [searchParams.get('type'), searchParams.get('name')];
    const [values, setValue] = useState(initState)
    const mapOptionRef = useRef({
        map: 'Map',
        renderer: 'device'
    });
    const [, forceUpdate] = useReducer((x) => x + 1, 0);


  
    const onGUIChange = (object) => {
        mapOptionRef.current = object;
        forceUpdate()
    }
    useEffect(() => {
        const gui = new GUI();
        const option = {
            map: 'Map',
            renderer: 'device'
        }
        gui.add(option, 'map', ['Map', 'GaodeMap', 'Mapbox', 'BaiduMap', 'TecentMap'])
        gui.add(option, 'renderer', ['Regl', 'Device'])
        gui.onChange((event) => {
            onGUIChange(event.object);
        });

    }, [])

    const CascaderOption = DemoList.map((group) => {
        return {
            label: group.name,
            value: group.name,
            children: Object.keys(group.demos).map((key) => {
                return {
                    label: key,
                    value: key,
                    demo: group.demos[key]
                }

            })
        }
    })

    const onChange = (e) => {
        history.pushState({ value: e }, '', `?type=${e[0]}&name=${e[1]}`);
        setValue(e)
    }
    return (<>
        <div style={{ position: 'absolute', left: '20px', zIndex: 10, top: '20px' }} >
            <Cascader defaultValue={initState as string[]} options={CascaderOption} onChange={onChange} />
        </div>

        {/* 不同 Demo 可替换 view 模板 */}
        < MapView data={values} options={mapOptionRef.current} />
    </>
    );
};
