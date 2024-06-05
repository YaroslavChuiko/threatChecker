import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

export const signatureService = {
  getSignaturesWithRelativeWeights: async (
    signatureModel: Prisma.SignatureDelegate<DefaultArgs>,
  ) => {
    const signatures = await signatureModel.findMany({
      include: { threats: true },
    });
    const weightSum = signatures.reduce((acc, item) => acc + item.weight, 0);

    return signatures.map((item) => ({
      ...item,
      relativeWeight: item.weight / weightSum,
    }));
  },
};
