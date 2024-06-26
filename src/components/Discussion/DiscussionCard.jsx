import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function DiscussionCard({ discussions, users }) {
  const navigate = useNavigate();

  const handleCardClick = (discussionId) => {
    navigate(`./${discussionId}`);
  };

  const handleKeyDown = (event, discussionId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(discussionId);
    }
  };

  const truncateBody = (body, limit) => {
    const plainText = body
      .replace(/<\/?[^>]+(>|$)/g, ' ') // menghapus tag yang dimulai < opsional diikuti / kemudian satu atau lebih karakter yang bukan > dan diakhiri > atau string
      .replace(/<br>/g, ' '); // karena br self-closing tag maka lolos dan diubah menjadi ' ' di replace kedua
    if (plainText.length <= limit) {
      return plainText;
    }
    const truncatedText = plainText.slice(0, limit);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    return `${truncatedText.slice(0, lastSpaceIndex)}...`;
  };

  return (
    <div className="md:px-3">
      {discussions.map((discussion) => {
        if (!discussion) return null;

        const user = users.find((user) => user.id === discussion.ownerId);

        if (!user || !discussion.tags) return null;

        const tagsArray = Array.isArray(discussion.tags)
          ? discussion.tags
          : discussion.tags.split(' ').filter((tag) => tag);

        return (
          <div
            key={discussion.id}
            className="mb-4 p-4 bg-card1 rounded-lg hover:bg-card2 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(discussion.id)}
            onKeyDown={(event) => handleKeyDown(event, discussion.id)}
          >
            <div className="flex items-center mb-2">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="text-text font-semibold">{`${user.name}`}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(discussion.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="px-4 md:px-10">
              <h2 className="text-text text-xl font-bold mb-2">
                {discussion.title}
              </h2>
              <p className="text-text mb-4">
                {truncateBody(discussion.body, 100)}
              </p>
              <div className="flex space-x-2 truncate">
                {tagsArray.map((tag) => (
                  <span key={tag} className="text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const commentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const discussionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(commentShape).isRequired,
});

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

DiscussionCard.propTypes = {
  discussions: PropTypes.arrayOf(discussionShape).isRequired,
  users: PropTypes.arrayOf(userShape).isRequired,
};
