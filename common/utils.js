const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220, 1664485938220, 1682255271235];
utils.flaggedSamples =[121,217,305,433,561,657,705,801,849,881,1361,1609,1610,1611,1801,1889,1937,1938,1969,2281,78,79,339,366,365,381,382,379,434,435,436,437,438,439,440,525,565,566,568,582,643,805,854,894,890,1362,1363,1364,1365,1366,1367,2019,2018,2017,2020,2021,2022,2023,2031,2040,2478,2488,2603,2652,2653,2655,2679,2723,2759,2760,2822,2930,2931,2942,3046,3041,3080,3197,3194,3225,3250,3267,3381,3382,3383,3384,3378,3377,3379,3380,3399,3403,3418,3419,3422,3424,3425,3426,3427,3428,3429,3430,3537,3538,3539,3540,3542,3541,3543,3544,3593,3690,3691,3689,3692,3693,3694,3695,3696,3697,3698,3699,3700,3701,3702,3703,3704,3817,3818,3821,3824,3878,3879,3880,3876,3875,3937,4008,4007,4006,4005,4004,4009,4010,4043,4211,4475,4526,4611,4615,4614,4613,4612,4609,4610,4701,4702,4835,4865,4866,4867,4868,4869,4870,4871,4872,4880,4879,4878,4877,4876,4875,4874,4873,4913,4929,4930,4931,4932,4933,4934,4935,4936,4950,4954,4955,4956,4957,4958,4959,4960,4967,4968,4964,4962,5008,5032,5034,5220,5223,5222,5225,5230,5242,5250,5249,5254,5255,5256,5257,5258,5259,5260,5261,5262,5263,5264,5270,5290,5368,5367,5366,5365,5392,5391,5390,5389,5388,5386,5385,5417,5428,5429,5430,5431,5432,5471,5572,5589,5595,5586,5587,5627,5628,5629,5647,5655,5654,5663,5678];

utils.classes = ["car","fish","house","tree","bicycle","guitar","pencil","clock"];


utils.styles = {
   car: { color: "gray", text: "🚗" },
   fish: { color: "red", text: "🐠" },
   house: { color: "yellow", text: "🏠" },
   tree: { color: "green", text: "🌳" },
   bicycle: { color: "cyan", text: "🚲" },
   guitar: { color: "blue", text: "🎸" },
   pencil: { color: "magenta", text: "✏️" },
   clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
   return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   const percent = utils.formatPercent(count / max);
   process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
   const groups = {};
   for (let obj of objArray) {
      const val = obj[key];
      if (groups[val] == null) {
         groups[val] = [];
      }
      groups[val].push(obj);
   }
   return groups;
};

utils.distance = (p1, p2) => {
   let sqDist = 0;
   for(let i = 0; i < p1.length; i++){
      sqDist += (p1[i] - p2[i]) ** 2;
   }
   return Math.sqrt(sqDist);
};

utils.getNearest = (loc, points, k = 1) => {
   const obj = points.map((val, ind) => {
      return { ind, val };
   });
   const sorted = obj.sort((a, b) => {
      return utils.distance(loc, a.val) - utils.distance(loc, b.val);
   });
   const indices = sorted.map((obj) => obj.ind);
   return indices.slice(0, k);
};

utils.lerp = (A,B,t) => {
   return A+(B-A)*t;
};

utils.invLerp = (a, b, v) => {
   return (v - a) / (b - a);
};

utils.normalizePoints = (points, minMax) => {
   let min, max;
   const dimensions = points[0].length;
   if (minMax) {
      min = minMax.min;
      max = minMax.max;
   } else {
      min = [...points[0]];
      max = [...points[0]];
      for (let i = 1; i < points.length; i++) {
         for (let j = 0; j < dimensions; j++) {
            min[j] = Math.min(min[j], points[i][j]);
            max[j] = Math.max(max[j], points[i][j]);
         }
      }
   }
   for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < dimensions; j++) {
         points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
      }
   }
   return { min, max };
};

utils.toCSV = (headers, samples) => {
   let str = headers.join(",") + "\n";
   for (const sample of samples) {
      str += sample.join(",") + "\n";
   }
   return str;
};

if (typeof module !== "undefined") {
   module.exports = utils;
}
