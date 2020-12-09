import React, {
  ComponentPropsWithoutRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { NextPage } from "next";
import Head from "components/templates/Head";
import styles from "./style.module.scss";
import useWindowSize from "@charlietango/use-window-size";
import uniqid from "uniqid";

const Pages: NextPage = () => {
  const [isSpread] = useState(false);
  const { height, width } = useWindowSize();
  const imgWrapperStyle = useMemo<ComponentPropsWithoutRef<"div">["style"]>(
    () => ({ width: isSpread ? width / 2 : width, height }),
    [height, isSpread, width]
  );
  const [count, setCount] = useState(0);
  const [images] = useState([
    "/1.jpg",
    "/2.jpg",
    "/1.jpg",
    "/2.jpg",
    "/1.jpg",
    "/2.jpg",
  ]);
  const handleClick = useCallback<ComponentPropsWithoutRef<"div">["onClick"]>(
    ({
      clientX,
      currentTarget: {
        dataset: { index },
      },
    }) => {
      setCount((prevCount) => {
        if (isSpread) {
          const nextCount =
            parseInt(index, 10) % 2 ? prevCount + 1 : prevCount - 1;

          if (nextCount < 0) {
            return 0;
          }

          if (nextCount > Math.ceil(images.length / 2) - 1) {
            return Math.ceil(images.length / 2) - 1;
          }

          return nextCount;
        }

        const nextCount = clientX >= width / 2 ? prevCount - 1 : prevCount + 1;

        if (nextCount < 0) {
          return 0;
        }

        if (nextCount > Math.ceil(images.length) - 1) {
          return Math.ceil(images.length) - 1;
        }

        return nextCount;
      });
    },
    [images.length, isSpread, width]
  );
  const items = useMemo(
    () =>
      images.map((src, index) => (
        <div
          className={styles.imgWrapper}
          data-index={index}
          key={uniqid()}
          onClick={handleClick}
          style={imgWrapperStyle}
        >
          <img
            className={`${styles.img} ${isSpread ? styles.spread : ""}`}
            src={src}
          />
        </div>
      )),
    [images, imgWrapperStyle, isSpread]
  );
  const wrapperStyle = useMemo<ComponentPropsWithoutRef<"div">["style"]>(
    () => ({ transform: `translateX(${count * width}px)` }),
    [count, width]
  );

  return (
    <>
      <Head />
      <div className={styles.wrapper} style={wrapperStyle}>
        {items}
      </div>
    </>
  );
};

export default Pages;
