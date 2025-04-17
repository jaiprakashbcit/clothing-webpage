import { categoriesData } from '../../utils/categories-data/categories-data.utility';

import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

function Directory() {
  return (
    <div className="direcory-container">
      <div className="directory">
        {categoriesData.map(({ id, title, imageUrl, route }) => (
          <DirectoryItem
            key={id}
            title={title}
            imageUrl={imageUrl}
            route={route}
          />
        ))}
      </div>
    </div>
  );
}

export default Directory;
