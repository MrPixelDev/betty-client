import * as React from "react";
import { styled } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import { CarouselInternalState } from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";
import { IAvailableStrategy } from "../../models/ITerminal";
import { Button, Paper } from "@mui/material";
import { FC, useContext, useState } from "react";
import StrategyStore from "../../store/strategyStore";
import { Context } from "../..";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

// interface CarouselProps {
//   array: IAvailableStrategy[];
// }

export function CarouselBlock() {
  const { strategyStore } = useContext(Context);
  // const [selectedItem, setSelectedItem] = useState<IAvailableStrategy | null>(
  //   null
  // );
  const [selectedItemElement, setSelectedItemElement] =
    useState<HTMLElement | null>(null);

  const handleItemSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: any
  ) => {
    e.preventDefault();
    if (
      e.currentTarget.parentElement?.classList.toString().includes("--active")
    ) {
      if (selectedItemElement?.classList.contains("selected-item")) {
        selectedItemElement.classList.toggle("selected-item");
      }
      e.currentTarget.parentElement?.classList.toggle("selected-item");
      setSelectedItemElement(e.currentTarget.parentElement);
      strategyStore.setSelectedStrategy(item);
      // setSelectedItem(item);
    }
  };

  type IItemProps = {
    key: number; // приходит от перебора массива
    item: IAvailableStrategy; // Сюда хочу отправлять любой объект с ключами
  };

  function Item({ item }: IItemProps) {
    // Здесь вместо Object должен подставляться тип объекта переданного item props

    // Тут приходит обязательно ключ, и дженерик объекта с ключами по которым далее буду делать перебор
    return (
      <Paper
        onClick={(e) => {
          handleItemSelect(e, item);
        }}
        sx={{
          textAlign: "center",
          p: 1,
        }}
      >
        {/* Динамический перебор данных в карточке */}
        {/* {Object.values(item).map((v, i) => (
          <p key={i}>{v}</p>
        ))} */}
        <p>Имя: {item.strategyName}</p>
        <p>Спорт: {item.sportName}</p>
        <p>Лига: {item.league}</p>
        <p>Ставка: {item.bet}</p>
        <p>Маржинальность: {item.marginality}</p>
        <p>Обязательства: {item.obligation}</p>
        <p>Размер стека: {item.stackSize}</p>
      </Paper>
    );
  }

  const selectedItemChangeHandler = (
    nextSlide: number,
    state: CarouselInternalState
  ) => {
    if (selectedItemElement?.classList.toString().includes("--active")) {
      selectedItemElement?.classList.add("selected-item");
    }
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      showDots={false}
      autoPlay={false}
      centerMode={true}
      infinite={false}
      containerClass="carousel-container"
      // beforeChange={selectedItemChangeHandler}
      afterChange={selectedItemChangeHandler}
    >
      {strategyStore.availableStrategies.map((item, i) => {
        return (
          <Item
            key={i}
            item={item}
            // Вот сюда хочу как то послать тип item допустим IAvailableStrategy или другой, чтобы далее этот компонент выводил только нужные поля в <p></p>
          />
        );
      })}
    </Carousel>
  );
}
