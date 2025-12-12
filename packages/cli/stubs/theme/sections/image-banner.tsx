import React from "react";
import { Swiper } from "@nutui/nutui-react-taro";
import {
  CommonEventFunction,
  SwiperProps as TaroSwiperProps,
} from "@tarojs/components";

interface ImageBannerProps {
  images: string[];
}
const ImageBanner = ({ images }: ImageBannerProps) => {
  const onChange: CommonEventFunction<TaroSwiperProps.onChangeEventDetail> = (
    e
  ) => {
    console.log(`onChange is trigger ${e}`);
  };
  return (
    <Swiper defaultValue={1} autoPlay indicator onChange={onChange}>
      {images.map((item, index) => (
        <Swiper.Item key={item}>
          <img
            width="100%"
            height="100%"
            onClick={() => console.log(index)}
            src={item}
            alt=""
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );
};
export default ImageBanner;
