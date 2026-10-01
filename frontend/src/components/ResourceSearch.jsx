import { useState } from 'react'

const resources = [
  {
    id: 1,
    title: 'Prenatal Nutrition Guide',
    category: 'Pregnancy',
    description: 'Nutrition guidance for expecting parents.',
    keywords: ['food', 'diet', 'vitamins', 'nutrition', 'prenatal'],
  },
  {
    id: 2,
    title: 'Birth Preparation Checklist',
    category: 'Birth',
    description: 'Planning resources for delivery.',
    keywords: ['birth', 'delivery', 'labor', 'planning', 'checklist'],
  },
  {
    id: 3,
    title: 'Postpartum Recovery',
    category: 'Postpartum',
    description: 'Recovery and wellness information after birth.',
    keywords: [
      'recovery',
      'postpartum',
      'wellness',
      'healing',
      'after birth',
    ],
  },
  {
    id: 4,
    title: 'Preparing for Your First Trimester',
    category: 'Pregnancy',
    description: 'Common considerations during early pregnancy.',
    keywords: [
      'pregnancy',
      'trimester',
      'early pregnancy',
      'first trimester',
    ],
  },
  {
    id: 5,
    title: 'Hospital Bag Checklist',
    category: 'Birth',
    description: 'Items to consider bringing for delivery.',
    keywords: [
      'hospital',
      'bag',
      'delivery',
      'packing',
      'birth',
    ],
  },
]

function getSearchScore(resource, searchTerm) {
  if (!searchTerm) {
    return 1
  }

  let score = 0

  if (
    resource.title
      .toLowerCase()
      .includes(searchTerm)
  ) {
    score += 3
  }

  if (
    resource.keywords.some((keyword) =>
      keyword.includes(searchTerm)
    )
  ) {
    score += 2
  }

  if (
    resource.description
      .toLowerCase()
      .includes(searchTerm)
  ) {
    score += 1
  }

  return score
}

function ResourceSearch({ onBack }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const searchTerm = search.trim().toLowerCase()

  const filteredResources = resources
    .map((resource) => ({
      ...resource,
      searchScore: getSearchScore(
        resource,
        searchTerm
      ),
    }))
    .filter((resource) => {
      const matchesSearch =
        !searchTerm || resource.searchScore > 0

      const matchesCategory =
        category === 'All' ||
        resource.category === category

      return matchesSearch && matchesCategory
    })
    .sort(
      (firstResource, secondResource) =>
        secondResource.searchScore -
        firstResource.searchScore
    )

  return (
    <main>
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Dashboard
      </button>

      <div className="page-header">
        <div>
          <h2>Resource Search</h2>
          <p>
            Find pregnancy, birth, and postpartum resources.
          </p>
        </div>
      </div>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>
          <option value="Pregnancy">
            Pregnancy
          </option>
          <option value="Birth">
            Birth
          </option>
          <option value="Postpartum">
            Postpartum
          </option>
        </select>
      </div>

      <p className="result-count">
        {filteredResources.length} resources found
      </p>

      <div className="resource-list">
        {filteredResources.map((resource) => (
          <div
            className="resource-card"
            key={resource.id}
          >
            <span className="resource-category">
              {resource.category}
            </span>

            <h3>{resource.title}</h3>

            <p>{resource.description}</p>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="empty-state">
            <h3>No resources found</h3>

            <p>
              Try another search term or category.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default ResourceSearch