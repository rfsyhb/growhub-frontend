import React from 'react';
import PropTypes from 'prop-types';

function NotesItemCard({ title, archived, content, date }) {
  const truncateBody = (body, limit) => {
    const plainText = body
      .replace(/<\/?[^>]+(>|$)/g, ' ') // menghapus tag HTML
      .replace(/<br>/g, ' '); // mengubah <br> menjadi spasi
    if (plainText.length <= limit) {
      return plainText;
    }
    const truncatedText = plainText.slice(0, limit);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    return `${truncatedText.slice(0, lastSpaceIndex)}...`;
  };

  return (
    <div className="bg-card1 text-text rounded-lg cursor-pointer p-4 md:p-0 flex flex-col gap-2">
      <div className="flex flex-row justify-between md:px-6 md:pt-4">
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-sm">{archived ? 'Archived' : 'Unarchived'}</p>
      </div>
      <div className="md:px-6 md:pb-4">
        <h3 className="font-bold text-lg truncate">{title}</h3>
        <p className="text-sm">{truncateBody(content, 100)}</p>
      </div>
    </div>
  );
}

NotesItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NotesItemCard;
