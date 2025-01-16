import { PlateComment } from "@/types/PlateComment";

export const plateCommentsData: PlateComment[] = [
    {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        plateId: "8",
        comment: 'This is a comment1',
        commentOwnerUserId: "3"
    },
    {
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        plateId: "8",
        comment: 'This is a comment2',
        commentOwnerUserId: "2"
    },
    {
        id: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        plateId: "6",
        comment: 'This is a comment3',
        commentOwnerUserId: "1"
    }
];

