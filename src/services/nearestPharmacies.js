// import { NearestPharmaciesCollection } from "../db/models/nearestPharmacies.js";
// import { calculatePaginationData } from "../utils/calculatePaginationData.js";

// export const getNearestPharmacies = async ({ page, perPage }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;
//   const nearestPharmaciesQuery = NearestPharmaciesCollection.find();

//   const [nearestPharmaciesCount, nearestPharmacies] = await Promise.all([
//     NearestPharmaciesCollection.countDocuments(),
//     nearestPharmaciesQuery.skip(skip).limit(limit).exec(),
//   ]);

//   const paginationData = calculatePaginationData(
//     nearestPharmaciesCount,
//     page,
//     perPage
//   );

//   return {
//     data: nearestPharmacies,
//     ...paginationData,
//   };
// };
import { NearestPharmaciesCollection } from "../db/models/nearestPharmacies.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getNearestPharmacies = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  console.log(`Page: ${page} PerPage: ${perPage}`);
  console.log(`Limit: ${limit} Skip: ${skip}`);

  // Запрос к базе для подсчета всех документов
  const nearestPharmaciesCount =
    await NearestPharmaciesCollection.countDocuments();
  console.log(`Total documents in database: ${nearestPharmaciesCount}`);

  // Проверка: если документов нет в базе, сразу возвращаем пустой результат
  if (nearestPharmaciesCount === 0) {
    return {
      data: [],
      page,
      perPage,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  // Запрос к базе для выборки с пагинацией
  const nearestPharmacies = await NearestPharmaciesCollection.find()
    .skip(skip)
    .limit(limit)
    .exec();

  console.log(`Found pharmacies: ${nearestPharmacies.length}`);
  console.log(nearestPharmacies);

  // Вычисление данных пагинации
  const paginationData = calculatePaginationData(
    nearestPharmaciesCount,
    page,
    perPage
  );

  // Возвращаем результат
  return {
    data: nearestPharmacies,
    ...paginationData,
  };
};
