// TrieNode and Trie classes for efficient tag matching
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;
        for (let char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }

    searchPartial(word) {
        let current = this.root;
        let matchLength = 0;
        for (let char of word) {
            if (current.children[char]) {
                current = current.children[char];
                matchLength++;
            } else {
                break;
            }
        }
        return matchLength;
    }
}

// Function to score each restaurant based on tags
function scoreRow(tags, trie) {
    const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
    let score = 0;
    tagArray.forEach(tag => {
        const partialScore = trie.searchPartial(tag);
        score += partialScore;
    });
    return score;
}

// Main function to process JSON data and sort based on scores
export function processAndSortRestaurants(jsonData, filters) {
    const trie = new Trie();
    filters.forEach(filter => trie.insert(filter.toLowerCase()));

    jsonData.forEach(restaurant => {
        restaurant.score = scoreRow(restaurant.tags, trie);
    });

    jsonData.sort((a, b) => b.score - a.score);
    return jsonData;
}

// Exporting the function for external usage
// module.exports = { processAndSortRestaurants };
