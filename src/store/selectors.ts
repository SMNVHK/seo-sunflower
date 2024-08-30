import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectKeywords = (state: RootState) => state.keywords.keywords;
export const selectKeywordFilter = (state: RootState) => state.keywords.filter;
export const selectKeywordSort = (state: RootState) => state.keywords.sort;

export const selectFilteredAndSortedKeywords = createSelector(
  [selectKeywords, selectKeywordFilter, selectKeywordSort],
  (keywords, filter, sort) => {
    let result = [...keywords];
    if (filter) {
      result = result.filter(keyword => keyword.trend === filter);
    }
    if (sort) {
      result.sort((a, b) => {
        if (sort === 'position') return a.position - b.position;
        if (sort === 'volume') return b.searchVolume - a.searchVolume;
        return 0;
      });
    }
    return result;
  }
);

export const selectSEOMetrics = (state: RootState) => state.seo;

export const selectAveragePosition = createSelector(
  [selectSEOMetrics],
  (seoMetrics) => seoMetrics.averagePosition
);

export const selectOrganicTraffic = createSelector(
  [selectSEOMetrics],
  (seoMetrics) => seoMetrics.organicTraffic
);

export const selectClickThroughRate = createSelector(
  [selectSEOMetrics],
  (seoMetrics) => seoMetrics.clickThroughRate
);

export const selectKeywordsRanking = createSelector(
  [selectSEOMetrics],
  (seoMetrics) => seoMetrics.keywordsRanking
);

export const selectTrendData = createSelector(
  [selectSEOMetrics],
  (seoMetrics) => seoMetrics.trendData
);