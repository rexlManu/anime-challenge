import { Element, ElementType } from "../element/Element";

const SELECT_MEDIAS = `
query(
	$page: Int = 1
	$id: Int
	$type: MediaType
	$isAdult: Boolean = false
	$search: String
	$format: [MediaFormat]
	$status: MediaStatus
	$countryOfOrigin: CountryCode
	$source: MediaSource
	$season: MediaSeason
	$seasonYear: Int
	$year: String
	$onList: Boolean
	$yearLesser: FuzzyDateInt
	$yearGreater: FuzzyDateInt
	$episodeLesser: Int
	$episodeGreater: Int
	$durationLesser: Int
	$durationGreater: Int
	$chapterLesser: Int
	$chapterGreater: Int
	$volumeLesser: Int
	$volumeGreater: Int
	$licensedBy: [String]
	$isLicensed: Boolean
	$genres: [String]
	$excludedGenres: [String]
	$tags: [String]
	$excludedTags: [String]
	$minimumTagRank: Int
	$sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
) {
	Page(page: $page, perPage: 1000) {
		pageInfo {
			total
			perPage
			currentPage
			lastPage
			hasNextPage
		}
		media(
			id: $id
			type: $type
			season: $season
			format_in: $format
			status: $status
			countryOfOrigin: $countryOfOrigin
			source: $source
			search: $search
			onList: $onList
			seasonYear: $seasonYear
			startDate_like: $year
			startDate_lesser: $yearLesser
			startDate_greater: $yearGreater
			episodes_lesser: $episodeLesser
			episodes_greater: $episodeGreater
			duration_lesser: $durationLesser
			duration_greater: $durationGreater
			chapters_lesser: $chapterLesser
			chapters_greater: $chapterGreater
			volumes_lesser: $volumeLesser
			volumes_greater: $volumeGreater
			licensedBy_in: $licensedBy
			isLicensed: $isLicensed
			genre_in: $genres
			genre_not_in: $excludedGenres
			tag_in: $tags
			tag_not_in: $excludedTags
			minimumTagRank: $minimumTagRank
			sort: $sort
			isAdult: $isAdult
		) {
			id
			title {
				userPreferred
			}
			coverImage {
				extraLarge
				large
				color
			}
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			bannerImage
			season
			description
			type
			format
			status(version: 2)
			episodes
			duration
			chapters
			volumes
			genres
			isAdult
			averageScore
			popularity
			nextAiringEpisode {
        id
				airingAt
				timeUntilAiring
				episode
			}
			mediaListEntry {
				id
				status
			}
		}
	}
}
`;

const SELECT_CHARACTER = `
query($id: Int) {
	Character(id: $id) {
    name {
      first
      middle
      last
      full
      native
      userPreferred,
    }
    image {
      large
      medium
    }
    description
    gender
    age
    bloodType
	}
}
`;

async function fetchAnime(id: number, isAdult: boolean) {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: SELECT_MEDIAS,
      variables: { id: id, isAdult },
    }),
  });
  const json = await response.json();

  const media = json.data.Page.media;
  const anime = media[0];
  if (!anime) return false;

  return anime;
}

async function fetchCharacter(id: number) {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: SELECT_CHARACTER,
      variables: { id: id },
    }),
  });
  const json = await response.json();

  const character = json.data.Character;
  if (!character) return false;

  return character;
}

const html = String.raw;
async function generateCode(elements: Element[], challenge: string) {
  const images = elements.filter(
    (e) => e.type == ElementType.ANIME || e.type == ElementType.CHARACTER
  ).length;
  let size = (100 / images).toFixed(2);
  if (images == 1) size = "50";

  for (const element of elements) {
    switch (element.type) {
      case ElementType.ANIME:
        let anime = await fetchAnime(element.properties.id, false);
        if (!anime) anime = await fetchAnime(element.properties.id, true);

        if (!anime) {
          element.properties.html = "";
          break;
        }
        element.properties.html = `<img width="${size}%" src="${anime.coverImage.large}" alt="${anime.title.userPreferred}" />`;
        break;
      case ElementType.CHARACTER:
        const character = await fetchCharacter(element.properties.id);
        if (!character) {
          element.properties.html = "";
          break;
        }

        element.properties.html = `<img width="${size}%" src="${character.image.large}" alt="${character.name.userPreferred}" />`;
        break;
      case ElementType.TEXT:
        element.properties.html = `<strong>${element.properties.text}</strong>`;
        break;
      case ElementType.ANIME_COVER:
        element.properties.html = `https://anilist.co/anime/${element.properties.id}/`;
        break;
      case ElementType.VIDEO:
        element.properties.html = `youtube(${element.properties.text})`;
        break;
      case ElementType.GIF:
        element.properties.html = `img(${element.properties.text})`;
        break;
    }
  }

  return `<center>100 DAYS ANIME CHALLENGE</center><hr /><p>${challenge}</p><center>${elements
    .filter((e) => e.type == ElementType.TEXT)
    .map((e) => e.properties.html)
    .join("")}</center><center>${elements
    .filter(
      (e) => e.type == ElementType.ANIME || e.type == ElementType.CHARACTER
    )
    .map((e) => e.properties.html)
    .join("")}<br />${elements
    .filter((e) => e.type == ElementType.VIDEO || e.type == ElementType.GIF)
    .map((e) => e.properties.html)
    .join("")}<br />${elements
    .filter((e) => e.type == ElementType.ANIME_COVER)
    .map((e) => e.properties.html)
    .join(
      ""
    )}<hr />~!<img alt=" Generated by https://anilist-challenge.manu.moe" src="https://files.catbox.moe/aapnyk.png" />!~ Generated by https://anilist-challenge.manu.moe</center>`;
}

export { SELECT_MEDIAS, generateCode };
