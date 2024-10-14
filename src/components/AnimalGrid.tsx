import { CloseOutlined, DislikeFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, List, Rate, Space } from 'antd';
import React from 'react';

import { useAnimalRatings } from '@/context/AnimalRatingsContext';
import { Rating } from '@/utils/types';

const AnimalGrid = () => {
  const { animalRatings, setAnimalRatings } = useAnimalRatings();

  const handleStarChange = (value: number, index: number) => {
    const updatedAnimalRatings = [...animalRatings];
    updatedAnimalRatings[index].rating.stars = value;
    setAnimalRatings(updatedAnimalRatings);
  };

  const handleCharacteristicRatingToggle = (index: number, key: keyof Rating['characteristics']) => {
    const updatedAnimalRatings = [...animalRatings];
    const currentValue = updatedAnimalRatings[index].rating.characteristics[key];

    let newValue: boolean | null;
    if (currentValue === null) {
      newValue = true; // thumbs up
    } else if (currentValue) {
      newValue = false; // thumbs down
    } else {
      newValue = null; // no rating
    }

    updatedAnimalRatings[index].rating.characteristics[key] = newValue;
    setAnimalRatings(updatedAnimalRatings);
  };

  const handleRemoveAnimal = (index: number) => {
    const updatedAnimalRatings = [...animalRatings];
    updatedAnimalRatings.splice(index, 1);
    setAnimalRatings(updatedAnimalRatings);
  };

  const renderThumbButton = (value: boolean | null, onClick: () => void) => {
    let icon = <LikeOutlined />;
    let className = 'text-gray-300 border-gray-300';

    if (value === true) {
      icon = <LikeFilled />;
      className = 'text-lime-500 border-lime-500';
    } else if (value === false) {
      icon = <DislikeFilled />;
      className = 'text-red-500 border-red-500';
    }

    return <Button shape="circle" size="small" onClick={onClick} icon={icon} className={className} />;
  };

  const renderLabelWithThumb = (label: string, value: boolean | null, onClick: () => void) => {
    return (
      <Space>
        {renderThumbButton(value, onClick)}
        {label}
      </Space>
    );
  };

  return (
    <List
      grid={{
        gutter: 16,
        column: 3,
      }}
      locale={{ emptyText: 'No favourite animals added yet' }}
      dataSource={animalRatings}
      renderItem={(animalRating, index) => (
        <List.Item>
          <Card
            title={
              <div className="flex justify-between items-center py-2">
                <div className="flex flex-col gap-1">
                  {animalRating.animal.name}
                  <Rate
                    value={animalRating.rating.stars}
                    onChange={(value) => handleStarChange(value, index)}
                    className="text-lime-500"
                  />
                </div>
                <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={() => handleRemoveAnimal(index)} />
              </div>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={renderLabelWithThumb('Weight', animalRating.rating.characteristics.weight, () =>
                  handleCharacteristicRatingToggle(index, 'weight'),
                )}
              >
                {animalRating.animal.characteristics.weight}
              </Descriptions.Item>

              <Descriptions.Item
                label={renderLabelWithThumb('Lifespan', animalRating.rating.characteristics.lifespan, () =>
                  handleCharacteristicRatingToggle(index, 'lifespan'),
                )}
              >
                {animalRating.animal.characteristics.lifespan}
              </Descriptions.Item>

              <Descriptions.Item
                label={renderLabelWithThumb('Skin Type', animalRating.rating.characteristics.skin_type, () =>
                  handleCharacteristicRatingToggle(index, 'skin_type'),
                )}
              >
                {animalRating.animal.characteristics.skin_type}
              </Descriptions.Item>

              <Descriptions.Item
                label={renderLabelWithThumb('Diet', animalRating.rating.characteristics.diet, () =>
                  handleCharacteristicRatingToggle(index, 'diet'),
                )}
              >
                {animalRating.animal.characteristics.diet}
              </Descriptions.Item>

              <Descriptions.Item
                label={renderLabelWithThumb('Habitat', animalRating.rating.characteristics.habitat, () =>
                  handleCharacteristicRatingToggle(index, 'habitat'),
                )}
              >
                {animalRating.animal.characteristics.habitat}
              </Descriptions.Item>

              <Descriptions.Item
                label={renderLabelWithThumb('Lifestyle', animalRating.rating.characteristics.lifestyle, () =>
                  handleCharacteristicRatingToggle(index, 'lifestyle'),
                )}
              >
                {animalRating.animal.characteristics.lifestyle}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default AnimalGrid;
