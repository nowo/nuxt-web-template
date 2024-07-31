<!-- vue项目添加高德地图 -->
<template>
    <div id="map"></div>
</template>

<script lang="ts" setup>
// import AMapLoader from "@amap/amap-jsapi-loader";
import { reactive, ref, render } from "vue";

const props = defineProps<{
    title?: string,
    address?: string
}>()


const key = ref('6f025e700cbacbb0bb866712d20bb35c')
// const key = ref('c2d8624cfd8ff1058ab6e3ea23d9a779')



// window对象扩展
declare global {
    interface Window {
        _AMapSecurityConfig: Record<string, string>;
    }
}

const initMap = async () => {
    if(!import.meta.client) return

    window._AMapSecurityConfig = {
        securityJsCode: '290ddc4b0d33be7bc9b354bc6a4ca614',
        // securityJsCode: 'd360b45265a6b65016eca2fb8d59da48',
    }
    const AMapLoader = await import('@amap/amap-jsapi-loader')

    const AMap = await AMapLoader.load({
        //首次调用 load
        key: key.value, //首次load key为必填
        version: "2.0",
        plugins: [
            "AMap.Scale",
            "AMap.ToolBar",
            "AMap.HawkEye",
            "AMap.MapType",
            "AMap.ElasticMarker",
            "AMap.AdvancedInfoWindow",
            "AMap.PlaceSearch",
            "AMap.InfoWindow",
            "AMap.Geocoder",
            // "AMap.MarkerCluster",
            // "AMap.Geolocation",
        ],
    })


    var map = new AMap.Map("map", {
        viewMode: '3D', //开启3D视图,默认为关闭
        zoom: 10, //地图级别
        // isHotspot: true
    });

    map.addControl(new AMap.ToolBar()); // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件

    map.addControl(new AMap.Scale()); // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺

    map.addControl(new AMap.HawkEye()); // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图

    map.addControl(new AMap.MapType()); // 添加图层切换插件

    //设置一个初始的标注
    var marker = new AMap.Marker();

    // 创建 infoWindow 实例
    var infoWindow = new AMap.InfoWindow({
        // isCustom: true, //使用自定义窗体
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, -35), //信息窗口上面偏移一点
    });

    map.addControl(new AMap.ElasticMarker()); //灵活点标记，可以随着地图级别改变样式和大小的 Marker(没看出来有啥区别,应该还需要配置参数吧)

    if (!props.address) return
    // 地址坐标转换,地址-->坐标
    const geoCoder = new AMap.Geocoder({
        city: props.address
    });

    geoCoder.getLocation(props.address, function (status: any, result: any) {

        const geoCodes = result.geocodes
        if (status === "complete" && geoCodes.length) {
            const lngLat = geoCodes[0].location;

            marker.setPosition(lngLat); //设置点标注位置中心
            // map.setZoom(15); //设置地图缩放层级
            map.add(marker); //添加点标注
            openInfo(); //打开信息窗口

            map.setFitView(marker); //自适应窗口位置(跟下面效果差不多,二选一即可)
            // map.setCenter(lngLat); //最后设置地图中心位置(需最后一步设置,不然在缩放时会产生偏差)
        } else {
            console.error("根据地址查询位置失败");
        }
    });
    // 信息窗口
    function openInfo() {
        var dom = `<div style="max-width:280px;">
                <b>${props.title}</b>
                <div style="font-size:90%;margin-top:5px;">${props.address}</div>
            </div>`;
        infoWindow.setContent(dom);
        infoWindow.open(map, marker.getPosition()); // 打开信息窗体
    }
    marker.on("click", openInfo);

    // var placeSearch = new AMap.PlaceSearch();  //构造地点查询类
    // var infoWindow2 = new AMap.InfoWindow({
    //     //  isCustom: true, //使用自定义窗体
    //     anchor: "bottom-center",
    //     offset: new AMap.Pixel(0, -18), //信息窗口上面偏移一点
    // });
    // // 地图热点
    // map.on('hotspotclick', function (result: any) {
    //     placeSearch.getDetails(result.id, function (status: any, result: any) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             const poiList = result.poiList.pois
    //             if (!poiList.length) return
    //             const firstNode = poiList[0];
    //             const dom = `<div>
    //                     <b>${firstNode.name}</b>
    //                     <div>
    //                         地址：${firstNode.address || firstNode.name}<br>
    //                         ${firstNode.tel ? '电话：' + firstNode.tel + '<br>' : ''}
    //                         类型：${firstNode.type}<br>
    //                     </div>
    //                 </div>`;
    //             infoWindow2.setContent(dom);
    //             infoWindow2.open(map, firstNode.location);
    //         }
    //     });
    // });


    // //根据经纬度获取地址信息
    // function getAddress(lnglat) {      //var lnglat = [116.396574, 39.992706]
    //     geoCoder.getAddress(lnglat, function (status, result) {
    //         if (status === 'complete' && result.info === 'OK') {
    //             return result.regeocode.formattedAddress;
    //         } else {
    //             console.error("位置查询失败");
    //         }
    //     })
    // }
}

// onMounted(() => {
initMap()
// })

</script>
