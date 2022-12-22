import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ onSetCategory, threads, categories }) {
  const categoriesList = threads.map((thread) => thread.category);
  const uniqueCategoriesList = [...new Set(categoriesList)];
  return (
    <div className="rounded-lg p-1 flex flex-col gap-2 justify-center items-center w-full">
      <div className="text-slate-100 text-lg font-semibold">
        Select tag to filter by category
      </div>
      <div>
        {uniqueCategoriesList.map((category) => (
          <button
            className={
              categories === category
                ? 'm-3 p-2 rounded-lg  bg-teal-600 ring-1 ring-teal-600 hover:bg-teal-600'
                : 'm-3 ring-1 p-2 ring-slate-100 rounded-lg bg-transparent hover:bg-teal-600 hover:ring-teal-600'
            }
            type="button"
            key={category}
            onClick={() => onSetCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoriesList.propTypes = {
  onSetCategory: PropTypes.func.isRequired,
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
  categories: PropTypes.string.isRequired,
};

export default CategoriesList;
